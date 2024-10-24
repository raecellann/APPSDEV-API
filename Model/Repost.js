import { connection } from '../core/database.js';

class Repost {
  
  /**
   * Add a repost to a post
   * 
   * @param {number} thread_id - The ID of the thread being reposted
   * @param {number} account_id - The ID of the user who is reposting
   * @returns {Promise<object>} - The result of the insert query
   */


  async add(thread_id, account_id) {
    const query = `
      INSERT INTO reposts (account_id, thread_id, reposted_at)
      VALUES (?, ?, NOW())
    `;
    
    try {
      const [result] = await connection.execute(query, [account_id, thread_id]);
      return result;
    } catch (err) {
      console.error('Error adding repost:', err.message);
      throw err;
    }
  }

  /**
   * Remove a repost from a post
   * 
   * @param {number} thread_id - The ID of the thread to remove repost
   * @param {number} account_id - The ID of the user who wants to remove the repost
   * @returns {Promise<void>}
   */

  async remove(thread_id, account_id) {
    const query = `
      DELETE FROM reposts
      WHERE thread_id = ? AND account_id = ?
    `;

    try {
      const [result] = await connection.execute(query, [thread_id, account_id]);
      return result;
    } catch (err) {
      console.error('Error removing repost:', err.message);
      throw err;
    }
  }

  /**
   * Get all reposts for a specific post
   * 
   * @param {number} thread_id - The ID of the thread
   * @returns {Promise<object[]>} - An array of reposts
   */

  
  async getAllReposts(thread_id) {
    const query = `
        SELECT * FROM reposts WHERE thread_id = ?
    `;
    try {
        const [reposts] = await connection.execute(query, [thread_id]);
        return reposts;
    } catch (err) {
        console.error('Error fetching reposts:', err.message);
        throw err;
    }
  }
}

export default Repost;
