import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Details</h2>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurant"
                render={({ field }) =>
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"></Input>
                        </FormControl>
                    </FormItem>
                } />
        </div>
    );
}

export default DetailsSection;