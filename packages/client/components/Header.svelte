<script lang="ts">
  import { createLinkHref } from '@pierce/client/utils/createLinkHref';
</script>

<header>
  <h1><a href="/">Logo</a></h1>
  <nav>
    <ul>
      <li><a href={createLinkHref('/')}>Home</a></li>
      <li><a href={createLinkHref('/product')}>Product</a></li>
      <li><a href={createLinkHref('/about')}>About</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: flex-start;
    gap: 40px;
    background: #f0f0f0;
    padding: 20px 40px;
  }

  a {
    text-decoration: underline;
    color: #333;
  }

  ul {
    display: flex;
    gap: 20px;
    list-style-type: none;
  }

  ul a {
    display: inline-block;
    padding: 10px 20px;
    background: #fff;
    text-decoration: none;
  }

  ul a:hover {
    background: #e0e0e0;
  }
</style>
