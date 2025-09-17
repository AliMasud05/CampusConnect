import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

const Notifications = () => {
  const [newOrderNotif, setNewOrderNotif] = useState(true);
  const [canceledOrderNotif, setCanceledOrderNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-6">Notification settings</h2>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">New Order</h3>
              <Switch
                checked={newOrderNotif}
                onCheckedChange={setNewOrderNotif}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Canceled order</h3>
              <Switch
                checked={canceledOrderNotif}
                onCheckedChange={setCanceledOrderNotif}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Email</h3>
              <Switch
                checked={emailNotif}
                onCheckedChange={setEmailNotif}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
