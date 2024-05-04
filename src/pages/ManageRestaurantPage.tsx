import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";


function ManageRestaurantPage() {
  const {isLoading: isCreateLoading, createRestaurant} = useCreateMyRestaurant();
  const {restaurant} = useGetMyRestaurant();
  const {isLoading: isUpdateLoading, updateRestaurant} = useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
  <ManageRestaurantForm 
    restaurant={restaurant} 
    onSave={isEditing ? updateRestaurant : createRestaurant} 
    isLoading={isUpdateLoading || isCreateLoading}
    />
  );
  
}

export default ManageRestaurantPage