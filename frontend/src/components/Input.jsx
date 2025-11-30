export default function Input({ title, name, placeholder, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      <input
        name={name}
        required
        placeholder={placeholder}
        {...props}
        className="w-full px-4 py-2 border-2 border-olive rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange transition"
      />
    </div>
  );
}
