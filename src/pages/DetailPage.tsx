import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItemC from "@/components/MenuItemC";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { MenuItem as MenuItemType } from '../types';
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

function DetailPage() {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const { isLoading: isCheckourtLoading, createCheckoutSession } = useCreateCheckoutSession();


    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCarItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems;

            if (existingCarItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            };

            sessionStorage.setItem(
                `cartItems-${restaurant}`,
                JSON.stringify(updatedCartItems)
            );
            console.log(restaurant);

            return updatedCartItems;


        });

    };

    const removeFromCart = (menuItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => menuItem._id !== item._id
            );

            sessionStorage.setItem(
                `cartItems-${restaurant}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    }

    const onCheckout = async (userFormData: UserFormData) => {
        console.log('userFormData', userFormData);

        //Asegura que siempre exista un restaurante.
        if (!restaurant) {
            return;
        }

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                email: userFormData.email as string,
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                country: userFormData.country,
                city: userFormData.city,
            },
        };

        console.log(checkoutData);

        const data = await createCheckoutSession(checkoutData);

        console.log(data.url);
        window.location.href = data.url;
    }

    if (isLoading || !restaurant) {
        return "Loading..."
    };

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {
                        restaurant.menuItems.map((menuItem, index) => (
                            <MenuItemC key={index} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                        ))
                    }
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cardItems={cartItems} removeFromCart={removeFromCart} />
                    </Card>
                    <CardFooter>
                        <CheckoutButton 
                        disabled={cartItems.length === 0} 
                        onCheckout={onCheckout} 
                        isLoading={isCheckourtLoading}
                        />
                    </CardFooter>
                </div>
            </div>
        </div>
    )


}
export default DetailPage;