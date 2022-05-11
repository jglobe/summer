import React, { useEffect, useState } from 'react';

import * as githubService from 'services/github.service';

import { Profile } from 'pages/profile';

import { ReactComponent as IconSearch } from 'components/icons/search.svg';
import { ReactComponent as IconUser } from 'components/icons/user.svg';
import { Header } from 'components/Header';
import { Loader } from 'components/Loader';
import { Placeholder } from 'components/Placeholder';

import './App.css';

export function App() {
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser(username) {
      try {
        setPending(true);
        const user = await githubService.getUser({ username });
        setUser(user);
      } catch (error) {
        if (error.status === 404) {
          setUser(null);
        } else {
          console.error(error);
        }
      } finally {
        setPending(false);
      }
    }

    if (username.length === 0) {
      setUser(null);
    } else {
      getUser(username);
    }
  }, [username]);

  return (
    <>
      <Header
        onSearchSubmit={setUsername}
      />
      <main className="container">
        {pending && <Loader />}

        {!pending && (
          <>
            {user && (
              <Profile
                user={user}
              />
            )}

            {user === null && username.length === 0 && (
              <Placeholder
                Icon={IconSearch}
              >
                Start with searching
                <br />
                a GitHub user
              </Placeholder>
            )}

            {user === null && username.length > 0 && (
              <Placeholder
                Icon={IconUser}
              >
                User not found
              </Placeholder>
            )}
          </>
        )}
      </main>
    </>
  );
}
