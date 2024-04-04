"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteUser } from "@/lib/actions/delete";
import { UserTableType } from "@/lib/types";
import { useState } from "react";

export const DeleteUser = ({ users }: { users: UserTableType[] }) => {
  const [userId, setUserId] = useState<string>();
  const [success, setSuccess] = useState(false);

  const handleDeleteUser = () => {
    deleteUser(userId!);
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
      <Button variant="destructive" className="w-full" disabled={!userId} onClick={handleDeleteUser}>
        Kullanıcıyı Sil
      </Button>
      <div>{success && <p className="text-center text-red-500">Kullanıcı silindi.</p>}</div>
    </div>
  );
};
