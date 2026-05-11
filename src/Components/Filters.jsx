export default function Filters({ options, value, onChange }) {
  return (
    <select className="filter-select" value={value} onChange={onChange}>
      {options.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}
