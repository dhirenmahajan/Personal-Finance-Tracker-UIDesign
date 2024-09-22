<script>
  import { createEventDispatcher } from 'svelte';

  // Variables bound to the form inputs
  let username = '';
  let password = '';
  let firstname = '';
  let lastname = '';
  let monthlyBudget = 1000; // Default budget value
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
        monthlyBudget, // Store the monthly budget
      };

      localStorage.setItem(userDataKey, JSON.stringify(newUserData));
      localStorage.setItem(`${username}_${password}_budget`, JSON.stringify(monthlyBudget)); // Separate key for budget
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

    <!-- Monthly Budget Slider -->
    <label for="monthlyBudget">Monthly Budget: ${monthlyBudget}</label>
    <input
      id="monthlyBudget"
      type="range"
      min="500"
      max="10000"
      step="100"
      bind:value={monthlyBudget}
    />

    <button type="submit">Create Account</button>

    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
  </form>

  <p>
    Already have an account?
    <button type="button" class="link-button" on:click={goToLogin}>Log in here</button>
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
  input[type="password"],
  input[type="range"] {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #2c2c2c;
    color: var(--text-color);
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: #444;
    border-radius: 4px;
    outline: none;
    margin: 0.5rem 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--accent-color);
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--accent-color);
    cursor: pointer;
    border-radius: 50%;
    border: none;
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
