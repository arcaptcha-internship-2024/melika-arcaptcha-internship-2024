<template>
  <form id="myForm" action="http://localhost:3000" enctype="application/x-www-form-urlencoded" method="POST">
    <h1>Submit Your Details</h1>

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Your full name" required>

    <label for="companyName">Company Name:</label>
    <input type="text" id="companyName" name="companyName" placeholder="Company you work for" required>

    <label for="jobPosition">Job Position:</label>
    <input type="text" id="jobPosition" name="jobPosition" placeholder="Your job position" required>

    <label for="phoneNumber">Phone Number:</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Your phone number" required>

    <label for="explanation">Explanation:</label>
    <textarea id="explanation" name="explanation" rows="4" placeholder="Provide a short explanation" required></textarea>
    <div class="arcaptcha" data-site-key="qh7aotm3n8"></div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {

}
</script>

<style>

</style>