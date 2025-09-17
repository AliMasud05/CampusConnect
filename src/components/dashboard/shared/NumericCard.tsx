import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";

interface NumericCardProps {
  title: string;
  value: number;
  percentage: number;
  className?: string;
  isDollarSign?: boolean;
  isPositive?: boolean;
}

const NumericCard: React.FC<NumericCardProps> = ({
  title,
  value,
  percentage,
  className,
  isDollarSign,
  isPositive,
}) => {
  const formattedValue =
    typeof value === "number"
      ? isDollarSign
        ? `$${value.toLocaleString()}`
        : value.toLocaleString()
      : value;
  return (
    <div>
      {" "}
      <div className={`p-6 bg-white rounded-lg ${className}`}>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-4xl font-bold mt-1">{formattedValue}</div>{" "}
        <div className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  <div
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-opacity-20 mr-1 
                    ${metric.isPositive ? 'bg-green-100' : 'bg-red-100'}"
                  >
                    {isPositive ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                  </div>
                  <span>{percentage}%</span>
                  <span className="ml-1 text-muted-foreground">than last month</span>
                </div>
      </div>
    </div>
  );
};

export default NumericCard;
