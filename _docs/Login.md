---
title: Login
category: Login
order: 1
---

<script src="{{ site.baseurl }}/scripts/track.js"></script>
<script>
    tracker();
</script>
<div class="login-container">
        <form id="login-form" >
            <input type="text" class="login-input-field" id="login-username"  placeholder="Username" required>
            <input type="password" class="login-input-field" id="login-password"  placeholder="Password" required>
            <button type="submit" class="login-submit-btn">Login</button>
        </form>
        <a href="#" class="login-forgot-password">Forgot your password?</a>
</div>
<script src="{{ site.baseurl }}/scripts/login.js"></script>