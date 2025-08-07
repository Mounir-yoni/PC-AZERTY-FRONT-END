import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getUser } from '@/lib/storage';
import useWilayas from '@/hooks/useWilayas';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function OrderUserInfo({ onChange }) {
  const { wilayas } = useWilayas();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: '',
    wilaya: '',
    wilayaObj: null,
    place: 'home',
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserInfo((prev) => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      }));
    }
  }, []);

  useEffect(() => {
    if (onChange) onChange(userInfo);
  }, [userInfo, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleWilayaChange = (value) => {
    const selectedWilaya = wilayas.find(w => w._id === value);
    setUserInfo((prev) => ({ ...prev, wilaya: value, wilayaObj: selectedWilaya }));
  };

  const handlePlaceChange = (value) => {
    setUserInfo((prev) => ({ ...prev, place: value }));
  };

  return (
    <div className="space-y-4 mb-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
          placeholder="Your address"
          required
        />
      </div>
      <div>
        <Label htmlFor="wilaya">Wilaya</Label>
        <Select value={userInfo.wilaya} onValueChange={handleWilayaChange}>
          <SelectTrigger id="wilaya">
            <SelectValue placeholder="Select wilaya" />
          </SelectTrigger>
          <SelectContent>
            {wilayas && wilayas.length > 0
              ? wilayas.map((w) => (
                  <SelectItem key={w._id || w.name} value={w._id}>{w.name}</SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
        {(!wilayas || wilayas.length === 0) && (
          <div className="text-sm text-red-500 mt-1">No wilayas found</div>
        )}
      </div>
      <div>
        <Label>Place</Label>
        <RadioGroup value={userInfo.place} onValueChange={handlePlaceChange} className="flex flex-row gap-4 mt-2">
          <RadioGroupItem value="home" id="place-home" />
          <Label htmlFor="place-home" className="mr-4">Home</Label>
          <RadioGroupItem value="office" id="place-office" />
          <Label htmlFor="place-office">Office</Label>
        </RadioGroup>
      </div>
    </div>
  );
}