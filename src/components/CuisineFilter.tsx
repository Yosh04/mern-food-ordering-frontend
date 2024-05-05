import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
    onchange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}

function CuisineFilter({ onchange, onExpandedClick, selectedCuisines, isExpanded }: Props) {

    const handleCuisinesReset = () => onchange([]);

    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickCuisine = event.target.value;

        const isChecked = event.target.checked;

        const newCuisineList = isChecked 
        ? [...selectedCuisines, clickCuisine] 
        : selectedCuisines.filter((cuisine)=> cuisine !== clickCuisine);

        onchange(newCuisineList);
    }




    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">
                    Filter By Cuisine
                </div>
                <div
                    onClick={handleCuisinesReset}
                    className="text-sm font-semibold mb-2 underline cursor-pointer">
                    Reset Filters
                </div>
            </div>
            <div className="space-y-2 flex-col">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine, index) => {
                    const isSelected = selectedCuisines.includes(cuisine);
                    return <div className="flex" key={index}>
                        <input
                            id={`cuisine_${cuisine}`}
                            type="checkbox"
                            className="hidden"
                            value={cuisine}
                            checked={isSelected}
                            onChange={handleCuisinesChange}
                        />
                        <Label
                            htmlFor={`cuisine_${cuisine}`}
                            className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected
                                ? "border border-green-600 text-green-600"
                                : "border border-slate-300"
                            }`}
                        >{isSelected && <Check size={20} strokeWidth={3}/>} {cuisine}</Label>
                    </div>
                })}

                <Button onClick={onExpandedClick} variant={'link'} className="mt-4 flex-1">
                    {isExpanded? (<span className="flex flex-row items-center">
                        View Less <ChevronUp/>
                    </span>): (<span className="flex flex-row items-center">
                        View Less <ChevronUp/> </span>)}
                </Button>
            </div>
        </>
    )
}

export default CuisineFilter