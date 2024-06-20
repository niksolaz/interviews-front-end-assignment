
interface ButtonProps {
  label: string,
  url: string
}

export default function Button({label, url}: ButtonProps) {
  return (
    <a href={url}>
      <button className="bg-red-500 text-xs uppercase text-white px-10 py-3 rounded-3xl hover:bg-red-600">
        {label}
      </button>
    </a>
  )
}