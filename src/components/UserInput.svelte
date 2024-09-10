<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let username = '';
    let password = '';
    let firstname = '';
    let lastname = '';
    let errorMessage = ''; // For displaying error messages
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const userDataKey = `${username}_${password}`;
      const existingUserData = getExistingUser(username);
  
      // Check if username already exists
      if (existingUserData) {
        // If the username exists, check if the password matches
        if (existingUserData.password === password) {
          // Password matches, proceed
          dispatch('userSubmitted', { username, password });
        } else {
          // Password does not match, show error
          errorMessage = 'Incorrect password. Please try again.';
        }
      } else {
        // If the username does not exist, create a new user entry
        const newUserData = {
          username,
          password,
          firstname,
          lastname,
          startDate: new Date().toISOString().split('T')[0], // Store current date (YYYY-MM-DD)
        };
  
        localStorage.setItem(userDataKey, JSON.stringify(newUserData));
        dispatch('userSubmitted', { username, password });
      }
    }
  
    // Function to get existing user data by username
    function getExistingUser(username) {
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (key.startsWith(username + "_")) {
          return JSON.parse(localStorage.getItem(key));
        }
      }
      return null; // Return null if no matching user is found
    }
  </script>
  
  <section>
    <h2>User Input</h2>
    <form on:submit={handleSubmit}>
      <label for="username">Username:</label>
      <input id="username" type="text" bind:value={username} required />
  
      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} required />
  
      <label for="firstname">First Name:</label>
      <input id="firstname" type="text" bind:value={firstname} required />
  
      <label for="lastname">Last Name:</label>
      <input id="lastname" type="text" bind:value={lastname} required />
  
      <button type="submit">Submit</button>
  
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    </form>
  </section>
  
  <style>
    section {
      background-color: var(--card-background);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: var(--text-color);
      width: 100%;
      max-width: 600px;
      margin: auto;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
  
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    button {
      background-color: var(--button-background);
      color: var(--button-text);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: var(--button-hover-background);
    }
  
    .error-message {
      color: red;
      font-weight: bold;
    }
  </style>
  