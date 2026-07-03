function ProblemForm() {
  return (
    <div>
      <h2>Add Problem</h2>

      <input
        type="text"
        placeholder="Problem Name"
      />

      <br />
      <br />

      <select>
        <option>Arrays</option>
        <option>Strings</option>
        <option>Trees</option>
        <option>Graphs</option>
      </select>

      <br />
      <br />

      <select>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <br />
      <br />

      <button>Add Problem</button>
    </div>
  );
}

export default ProblemForm;