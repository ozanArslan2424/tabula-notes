"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { makeAdmin, removeAdmin } from "@/lib/actions/admin.actions";
import { UserTableType } from "@/lib/types";
import { useState } from "react";

export const ChangeAdmin = ({ users }: { users: UserTableType[] }) => {
  const [userId, setUserId] = useState<string>();

  const handleMakeAdmin = () => {
    makeAdmin(userId!);
  };

  const handleRemoveAdmin = () => {
    removeAdmin(userId!);
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={(e) => setUserId(e)} defaultValue={userId}>
        <SelectTrigger>
          <SelectValue placeholder="Kullanıcı seç" />
        </SelectTrigger>

        <SelectContent>
          {users.map((user) => (
            <SelectItem value={user.id} key={user.id} className="flex items-center gap-2">
              <p>{user.email}</p>
              <p className="text-muted-foreground">{user.username}</p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full" disabled={!userId} onClick={handleMakeAdmin}>
        Admin Yap
      </Button>
      <Button variant="outline" className="w-full" disabled={!userId} onClick={handleRemoveAdmin}>
        Adminliği Kaldır
      </Button>
    </div>
  );
};
