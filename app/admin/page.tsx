import { DeleteUser } from "@/components/admin/delete-user";
import { InviteForm } from "@/components/admin/invite-form";
import { ChangeAdmin } from "@/components/admin/make-admin";
import { UserButton } from "@/components/auth/user-button";
import { LinkButton } from "@/components/link-button";
import { ThemeToggle } from "@/components/switch-theme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllUserInfo } from "@/lib/actions/admin.actions";
import { getSession } from "@/lib/auth";
import { UserTableType } from "@/lib/types";
import { Command, TriangleAlert, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminPage() {
  const { user } = await getSession();
  if (user && user.role !== "ADMIN") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center rounded-md bg-destructive p-8 text-destructive-foreground">
          <TriangleAlert size={64} />
          <p className="mt-12 text-2xl font-bold">Admin sayfasına erişiminiz yok!</p>
        </div>
        <LinkButton
          className="w-max border-primary bg-transparent text-secondary-foreground"
          variant="outline"
          href="/dash"
        >
          &#x2190; Kütüphaneye dön
        </LinkButton>
      </div>
    );
  }

  if (user && user.role === "ADMIN") {
    const users: UserTableType[] = await getAllUserInfo();
    return (
      <Tabs defaultValue="users" className="min-h-screen">
        <header className="flex h-14 w-full items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="hidden items-center gap-2 font-semibold md:flex">
            <h1>Tabula Notlar</h1>
          </Link>

          <nav>
            <TabsList className="w-full bg-transparent text-sm font-medium">
              <TabsTrigger value="users">
                <User className="mr-2 h-4 w-4" />
                Kullanıcılar
              </TabsTrigger>
              <TabsTrigger value="commands">
                <Command className="mr-2 h-4 w-4" />
                Komuta Merkezi
              </TabsTrigger>
            </TabsList>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton user={user} />
          </div>
        </header>

        <TabsContent value="users">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Kullanıcılar</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Book Count</TableHead>
                    <TableHead>Account Count</TableHead>
                    <TableHead>Quicknote Count</TableHead>
                    <TableHead>Session Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {user.image && <Image src={user.image} alt={"user image"} width={32} height={32} />}
                      </TableCell>
                      <TableCell>{user._count.books}</TableCell>
                      <TableCell>{user._count.accounts}</TableCell>
                      <TableCell>{user._count.quicknotes}</TableCell>
                      <TableCell>{user._count.sessions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={8}>Total User Count</TableCell>
                    <TableCell>{users.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </main>
        </TabsContent>

        <TabsContent value="commands">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Komutlar</h1>
            </div>
            <div className="grid grid-flow-row grid-cols-1 gap-4 rounded-lg border border-dashed p-8 shadow-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Kullanıcı rolü değiştir</CardTitle>
                  <CardDescription>Seçilen kullanıcının rolünü değiştirir.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChangeAdmin users={users} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Kullanıcı sil</CardTitle>
                  <CardDescription>Seçilen kullanıcıyı sil.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DeleteUser users={users} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Davet yolla</CardTitle>
                  <CardDescription>E-postaya davet yolla.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InviteForm />
                </CardContent>
              </Card>
            </div>
          </main>
        </TabsContent>
      </Tabs>
    );
  }
}
