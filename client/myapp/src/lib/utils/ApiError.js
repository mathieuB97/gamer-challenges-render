/**
 * @template T Type de données supplémentaire
 */
class ApiError extends Error {
    /**
     * 
     * @param {string} message 
     * @param {number} code 
     * @param {number} status
     * @param {T} [data] data
     */
    constructor(message = '', code = 500, status = 500, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}
export default ApiError;