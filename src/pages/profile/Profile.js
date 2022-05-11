import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as githubService from 'services/github.service';

import { ReactComponent as IconFollower } from 'components/icons/follower.svg';
import { ReactComponent as IconEmpty } from 'components/icons/empty.svg';
import { ReactComponent as IconFollowers } from 'components/icons/followers.svg';
import { Placeholder } from 'components/Placeholder';
import { Loader } from 'components/Loader';
import { Pagination } from 'components/Pagination';

import './Profile.css';

const PER_PAGE = 4;

function formatNumber(count) {
  let result = count;
  if (count >= 1000000000) {
    result = `${(count / 1000000000).toFixed(1)}B`;
  } else if (count >= 1000000) {
    result = `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    result = `${(count / 1000).toFixed(1)}K`;
  }
  return result;
}

export function Profile({ user }) {
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories(username) {
      try {
        setPending(true);
        const repositories = await githubService.getRepositories({
          username,
          page,
          perPage: PER_PAGE,
        });
        setRepositories(repositories);
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    }

    getRepositories(user.login);
  }, [page, user.login]);

  return (
    <div className="profile">
      <div className="user">
        <div className="user__image">
          <img src={user.avatar_url} alt={user.login} />
        </div>
        <div className="user__info">
          <div className="user__name">
            {user.name}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            className="user__link"
            rel="noreferrer"
          >
            {user.login}
          </a>
          <div className="user__following">
            <div className="followers">
              <IconFollowers className="followers__icon" />
              {formatNumber(user.followers)}
              {' '}
              followers
            </div>
            <div className="followers">
              <IconFollower className="followers__icon" />
              {formatNumber(user.following)}
              {' '}
              following
            </div>
          </div>
        </div>
      </div>
      <div className="repositories">
        <div className="repositories__content">
          {user.public_repos === 0 && (
            <Placeholder
              Icon={IconEmpty}
            >
              Repository list is empty
            </Placeholder>
          )}

          {user.public_repos > 0 && (
            <>
              {repositories.length === 0 && pending && (
                <Loader />
              )}

              {repositories.length > 0 && (
                <>
                  <h2 className="repositories__title">
                    Repositories (
                    { user.public_repos }
                    )
                  </h2>
                  <div
                    className="repositories__list"
                    style={{ opacity: pending ? 0.5 : 1 }}
                  >
                    {repositories.map((repository) => (
                      <div
                        className="repository"
                        key={repository.id}
                      >
                        <a
                          href={repository.html_url}
                          target="_blank"
                          className="repository__link"
                          rel="noreferrer"
                        >
                          {repository.name}
                        </a>
                        <p className="repository__description">
                          {repository.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {user.public_repos > 4 && (
          <div className="repositories__pagination">
            <Pagination
              page={page}
              setPage={setPage}
              count={user.public_repos}
              perPage={PER_PAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    public_repos: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
};
