
interface PowerBarProps {
    value: number // 100 - 10000
  }
  
  export function PowerBar({ value }: PowerBarProps) {
    // Normalize power to a percentage (0–100)
    const percentage = Math.min(100, Math.max(0, (value / 10000) * 100))
  
    // Color scale: green for high, yellow mid, red low
    let color = "bg-red-300"
    if (value > 7000) color = "bg-green-300"
    else if (value > 3000) color = "bg-yellow-300"
  
    return (
      <div className="w-full h-3 bg-gray-100 rounded">
        <div
          className={`h-3 rounded ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    )
  }
  