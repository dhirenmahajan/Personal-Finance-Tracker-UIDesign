<script>
  import { createEventDispatcher } from 'svelte';

  // Variables bound to the form inputs
  let username = '';
  let password = '';
  let errorMessage = '';

  const dispatch = createEventDispatcher();

  // Function to handle login form submission
  function handleLogin(event) {
    event.preventDefault();

    const userDataKey = `${username}_${password}`;
    const existingUserData = JSON.parse(localStorage.getItem(userDataKey));

    if (existingUserData) {
      // Successful login
      dispatch('loginSuccess', { username, password });
    } else {
      // Invalid credentials
      errorMessage = 'Incorrect username or password.';
    }
  }

  // Function to navigate to the signup page
  function goToSignup() {
    dispatch('navigate', { page: 'signup' });
  }
</script>

<section>
  <h2>Login</h2>
  <form on:submit|preventDefault={handleLogin}>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} required />

    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required />

    <button type="submit">Login</button>

    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
  </form>

  <p>
    Don't have an account?
    <button type="button" class="link-button" on:click={goToSignup}>Sign up here</button>
  </p>
</section>

<style>
  section {
    background-color: var(--card-background);
    padding: 2rem;
    border-radius: 8px;
    color: var(--text-color);
    max-width: 400px;
    margin: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  h2 {
    margin-top: 0;
    text-align: center;
    color: var(--primary-color);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--text-color);
  }

  input[type="text"],
  input[type="password"] {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2c2c2c;
    color: var(--text-color);
  }

  button[type="submit"] {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: var(--button-hover-background);
  }

  /* Style for link-like button */
  .link-button {
    background: none;
    border: none;
    padding: 0;
    color: var(--accent-color);
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }

  .link-button:hover {
    text-decoration: underline;
  }

  .error-message {
    color: var(--error-color);
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
  }

  p {
    text-align: center;
    margin-top: 1rem;
  }
</style>
