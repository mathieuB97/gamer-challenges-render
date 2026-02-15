<script>
  import { userStore } from "../lib/stores/user.store.js";
  /**
   * @typedef {Object} Props
   * @property {number} [size]
   */

  /** @type {Props} */
  let { size = 36 } = $props();

  function getInitials(str) {
    if (!str) return "?";
    const parts = str.replace(/([a-z])([A-Z])/g, "$1 $2").split(/[\s_-]+/);
    return parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  }

  let displayPseudo = $derived($userStore?.pseudo ?? "?");
  let initials = $derived(getInitials(displayPseudo));
</script>

<div
  class="avatar rounded-full flex items-center justify-center bg-gradient-to-br from-[#7b2cbf] to-[#00d9ff] text-white font-semibold"
  style="width:{size}px; height:{size}px; font-size:{size/2.4}px"
  title={displayPseudo}
>
  {initials}
</div>


<style>
  .avatar {
    border-radius: 50%;
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    letter-spacing: 0.05em;
    width: 4rem;               
    height: 4rem;                  
    display: flex;              
    flex-shrink: 0;           
    background: linear-gradient(to bottom right, #7b2cbf, #00d9ff);                    
    font-size: 1rem;         
  }
</style>