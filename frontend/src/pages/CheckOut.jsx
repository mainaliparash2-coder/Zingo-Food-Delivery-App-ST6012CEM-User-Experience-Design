import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import { FaCreditCard } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { serverUrl } from "../App";
import { setAddress, setLocation } from "../redux/mapSlice";
import { addMyOrder } from "../redux/userSlice";

function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location.lat && location.lon) {
      map.setView([location.lat, location.lon], 16, { animate: true });
    }
  }, [location, map]);
  return null;
}

function CheckOut() {
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount, userData } = useSelector(
    (state) => state.user
  );

  const [addressInput, setAddressInput] = useState("");
  const [addressTouched, setAddressTouched] = useState(false);
  const [addressError, setAddressError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ✅ Coupon states (working version)
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  // ✅ Address validation
  const validateAddress = () => {
    if (!addressInput.trim()) return "Delivery location is required.";
    return "";
  };

  // ✅ Amount calculations (discount + delivery)
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const discountAmount = (totalAmount * discountPercent) / 100;
  const subtotalAfterDiscount = totalAmount - discountAmount;
  const AmountWithDeliveryFee = subtotalAfterDiscount + deliveryFee;

  const isAddressValid = addressInput.trim().length > 0;

  // ✅ Apply coupon (same as your working code)
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/coupon/validate`,
        { code: couponCode.trim(), userId: userData._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        setAppliedCoupon(couponCode);
        setDiscountPercent(res.data.discountPercent || 10);
        alert(`🎉 Coupon applied! ${res.data.discountPercent || 10}% discount`);
        setShowCouponInput(false);
      } else {
        alert(res.data.message || "Invalid coupon");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setShowCouponInput(false);
  };

  // ✅ Location helpers
  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(res.data.results[0]?.address_line2 || ""));
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getCurrentLocation = () => {
    const latitude = userData.location.coordinates[1];
    const longitude = userData.location.coordinates[0];
    dispatch(setLocation({ lat: latitude, lon: longitude }));
    getAddressByLatLng(latitude, longitude);
  };

  const getLatLngByAddress = async () => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      const { lat, lon } = res.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Place order + mark coupon used (same behavior as your working code)
  const handlePlaceOrder = async () => {
    setAddressTouched(true);
    const err = validateAddress();
    setAddressError(err);
    if (err) return;

    try {
      const res = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.lon,
          },
          totalAmount: AmountWithDeliveryFee,
          cartItems,
          couponCode: appliedCoupon || null,
          discountApplied: discountAmount,
        },
        { withCredentials: true }
      );

      // ✅ Mark coupon used after successful order placement
      if (appliedCoupon) {
        await axios.post(
          `${serverUrl}/api/coupon/use`,
          { code: appliedCoupon, userId: userData._id },
          { withCredentials: true }
        );
      }

      dispatch(addMyOrder(res.data));
      navigate("/order-placed");
    } catch (err) {
      console.log(err);
      alert("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  useEffect(() => {
    if (addressTouched) setAddressError(validateAddress());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressInput]);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6">
      <div
        className="absolute top-[20px] left-[20px]"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
      </div>

      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        {/* Delivery Location */}
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <IoLocationSharp className="text-[#ff4d2d]" /> Delivery Location
          </h2>

          <div className="flex gap-2 mb-1">
            <input
              type="text"
              value={addressInput}
              onChange={(e) => {
                setAddressInput(e.target.value);
                if (addressTouched) setAddressError(validateAddress());
              }}
              onBlur={() => {
                setAddressTouched(true);
                setAddressError(validateAddress());
              }}
              placeholder="Enter Your Delivery Address.."
              className={`flex-1 border rounded-lg p-2 text-sm focus:outline-none ${
                addressError ? "border-red-400" : "border-gray-300"
              }`}
            />

            <button
              onClick={getLatLngByAddress}
              className="bg-[#ff4d2d] text-white px-3 rounded-lg"
            >
              <IoSearchOutline size={17} />
            </button>

            <button
              onClick={getCurrentLocation}
              className="bg-blue-500 text-white px-3 rounded-lg"
            >
              <TbCurrentLocation size={17} />
            </button>
          </div>

          {addressError && (
            <p className="text-sm text-red-600 mb-2">{addressError}</p>
          )}

          <div className="rounded-xl border overflow-hidden h-64">
            <MapContainer
              center={[location.lat, location.lon]}
              zoom={16}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <RecenterMap location={location} />
              <Marker
                position={[location.lat, location.lon]}
                draggable
                eventHandlers={{ dragend: onDragEnd }}
              />
            </MapContainer>
          </div>
        </section>

        {/* Coupon Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <RiCoupon3Fill className="text-[#ff4d2d]" /> Have a Coupon?
          </h2>

          {!appliedCoupon ? (
            showCouponInput ? (
              <div className="rounded-xl border border-gray-200 p-4 bg-orange-50">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g., COLLAB-1234)"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading}
                    className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition"
                  >
                    {couponLoading ? "Applying..." : "Apply"}
                  </button>
                </div>
                <button
                  onClick={() => setShowCouponInput(false)}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCouponInput(true)}
                className="w-full border-2 border-dashed border-[#ff4d2d] rounded-xl p-4 text-[#ff4d2d] font-semibold hover:bg-orange-50 transition flex items-center justify-center gap-2"
              >
                <RiCoupon3Fill size={20} />
                Redeem Coupon Code
              </button>
            )
          ) : (
            <div className="rounded-xl border-2 border-green-500 bg-green-50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <RiCoupon3Fill size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coupon Applied</p>
                  <p className="font-bold text-gray-800">{appliedCoupon}</p>
                  <p className="text-sm text-green-600">
                    {discountPercent}% discount
                  </p>
                </div>
              </div>
              <button
                onClick={removeCoupon}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`border p-4 rounded-xl cursor-pointer ${
                paymentMethod === "cod" && "border-[#ff4d2d] bg-orange-50"
              }`}
            >
              <MdDeliveryDining /> Cash On Delivery
            </div>
            <div
              onClick={() => setPaymentMethod("online")}
              className={`border p-4 rounded-xl cursor-pointer ${
                paymentMethod === "online" && "border-[#ff4d2d] bg-orange-50"
              }`}
            >
              <FaMobileScreenButton /> <FaCreditCard /> Online Payment
            </div>
          </div>
        </section>

        {/* ✅ Order Summary (shows discount clearly) */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Order Summary
          </h2>

          <div className="rounded-xl border bg-gray-50 p-4 space-y-2">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}

            <hr className="border-gray-200 my-2" />

            <div className="flex justify-between font-medium text-gray-800">
              <span>Subtotal</span>
              <span>Rs. {totalAmount}</span>
            </div>

            {appliedCoupon && (
              <>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount Applied ({discountPercent}%)</span>
                  <span>-Rs. {discountAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal after discount</span>
                  <span>Rs. {subtotalAfterDiscount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-green-600 bg-green-50 p-2 rounded">
                  <span>Coupon Applied</span>
                  <span>{appliedCoupon}</span>
                </div>
              </>
            )}

            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-[#ff4d2d] pt-2 border-t-2">
              <span>Total</span>
              <span>Rs. {AmountWithDeliveryFee.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Place Order */}
        <button
          disabled={!isAddressValid}
          onClick={handlePlaceOrder}
          className={`w-full py-3 rounded-xl font-semibold ${
            isAddressValid
              ? "bg-[#ff4d2d] text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
