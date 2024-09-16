<script>
    import { createEventDispatcher } from 'svelte';
  
    // Variables bound to the form inputs
    let username = '';
    let password = '';
    let firstname = '';
    let lastname = '';
    let errorMessage = '';
  
    const dispatch = createEventDispatcher();
  
    // Function to handle signup form submission
    function handleSignup(event) {
      event.preventDefault();
  
      if (checkIfUserExists(username)) {
        errorMessage = 'Username already exists. Please choose a different username.';
      } else {
        const userDataKey = `${username}_${password}`;
        const newUserData = {
          username,
          password,
          firstname,
          lastname,
          startDate: new Date().toISOString().split('T')[0],
        };
  
        localStorage.setItem(userDataKey, JSON.stringify(newUserData));
        dispatch('signupSuccess', { username, password });
      }
    }
  
    // Function to check if a user with the same username already exists
    function checkIfUserExists(username) {
      const allKeys = Object.keys(localStorage);
      return allKeys.some(key => key.startsWith(`${username}_`));
    }
  
    // Function to navigate to the login page
    function goToLogin() {
      dispatch('navigate', { page: 'login' });
    }
  </script>
  
  <section>
    <h2>Sign Up</h2>
    <form on:submit|preventDefault={handleSignup}>
      <label for="username">Username:</label>
      <input id="username" type="text" bind:value={username} required />
  
      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} required />
  
      <label for="firstname">First Name:</label>
      <input id="firstname" type="text" bind:value={firstname} required />
  
      <label for="lastname">Last Name:</label>
      <input id="lastname" type="text" bind:value={lastname} required />
  
      <button type="submit">Create Account</button>
  
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    </form>
  
    <p>Already have an account? <button type="button" class="link-button" on:click={goToLogin}>Log in here</button></p>
</section>
  
  <style>
    section {
      background-color: var(--card-background, #1e1e1e);
      padding: 2rem;
      border-radius: 8px;
      color: var(--text-color, #ffffff);
      max-width: 400px;
      margin: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
  
    h2 {
      margin-top: 0;
      text-align: center;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    label {
      margin-bottom: 0.5rem;
    }
  
    input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    button {
      background-color: var(--button-background, #6200ee);
      color: var(--button-text, #ffffff);
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  
    button:hover {
      background-color: var(--button-hover-background, #3700b3);
    }
  
    .error-message {
      color: red;
      font-weight: bold;
      margin-top: 1rem;
    }
  
    p {
      text-align: center;
      margin-top: 1rem;
    }
  

    .link-button {
    background: none;
    border: none;
    padding: 0;
    color: var(--button-background, #6200ee);
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    }

    .link-button:hover {
    text-decoration: underline;
    }

    /* Removed unused CSS selector */
  </style>
  