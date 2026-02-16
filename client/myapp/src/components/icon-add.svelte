<script>
  /**
   * @typedef {Object} Props
   * @property {number} [size] - taille par défaut
   * @property {string} [className] - classes optionnelles
   */

  /** @type {Props} */
  let { size = 18, className = "" } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  class={className}
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M12 5v14" />
  <path d="M5 12h14" />
</svg>