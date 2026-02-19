<script>
  /**
   * @typedef {Object} Props
   * @property {number} [size]
   * @property {string} [className]
   */

  /** @type {Props} */
  let { size = 16, className = "" } = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
>
  <path
    d="M4 2L13.3333 8L4 14V2Z"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
