import { DeleteUser } from "@/components/admin/delete-user";
import { InviteForm } from "@/components/admin/invite-form";
import { ChangeAdmin } from "@/components/admin/make-admin";
import { BugReport } from "@/components/bug-report";
import { AccessDenied } from "@/components/errors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteBug, getAllUserInfo, getBugs, resolveBug } from "@/lib/actions/admin.actions";
import { getSession } from "@/lib/auth";
import { BugReportType, UserTableType } from "@/lib/types";
import { Command, TestTube2Icon, User } from "lucide-react";
import Image from "next/image";
import AdminTestPage from "../../components/test-page";

export default async function AdminPage() {
  const { user } = await getSession();
  if (user && user.role !== "ADMIN") {
    return <AccessDenied />;
  }

  if (user && user.role === "ADMIN") {
    const users: UserTableType[] = await getAllUserInfo();
    const bugs: BugReportType[] = await getBugs();

    return (
      <Tabs defaultValue="users" className="min-h-screen">
        <TabsList className="w-full bg-transparent text-sm font-medium flex items-center justify-center gap-2 my-2">
          <TabsTrigger value="users" className="bg-accent hover:bg-accent/50 data-[state=active]:border-primary/20 border border-transparent">
            <User className="mr-2 h-4 w-4" />
            Kullanıcılar
          </TabsTrigger>
          <TabsTrigger value="commands" className="bg-accent hover:bg-accent/50 data-[state=active]:border-primary/20 border border-transparent">
            <Command className="mr-2 h-4 w-4" />
            Komuta Merkezi
          </TabsTrigger>
          <TabsTrigger value="test" className="bg-accent hover:bg-accent/50 data-[state=active]:border-primary/20 border border-transparent">
            <TestTube2Icon className="mr-2 h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold md:text-2xl">Hatalar</h1>
              <BugReport userId={user.id} />
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bugs.map((bug) => (
                    <TableRow key={bug.id}>
                      <TableCell>{bug.subject}</TableCell>
                      <TableCell>{bug.description}</TableCell>
                      <TableCell>{bug.userId}</TableCell>
                      <TableCell>
                        {bug.createdAt.toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {bug.resolved ? (
                          <span className="px-2 py-1.5 font-semibold text-success">Resolved</span>
                        ) : (
                          <form
                            action={async () => {
                              "use server";
                              await resolveBug(bug.id);
                            }}
                          >
                            <Button type="submit">Resolve</Button>
                          </form>
                        )}
                      </TableCell>
                      <TableCell>
                        <form
                          action={async () => {
                            "use server";
                            await deleteBug(bug.id);
                          }}
                        >
                          <Button variant="custom_destructive" type="submit">
                            Delete
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
                    <TableHead>Tasks Count</TableHead>
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
                      <TableCell>{user._count.tasks}</TableCell>
                      <TableCell>{user._count.sessions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={9}>Total User Count</TableCell>
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
        <TabsContent value="test">
          <AdminTestPage />
        </TabsContent>
      </Tabs>
    );
  }
}
