export default function Filters({ options }) {
  return (
    <select className="filter-select">
      {options.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}
