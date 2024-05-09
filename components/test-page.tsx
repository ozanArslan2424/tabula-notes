import { AccessDenied } from "@/components/errors";
import { GoToGroup } from "@/components/group/go-to-group";

import { getAllBooks, getBookContents } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { BookType } from "@/lib/types";

export default async function AdminTestPage() {
  const { user } = await getSession();
  if (user && user.role !== "ADMIN") {
    return <AccessDenied />;
  }

  if (user && user.role === "ADMIN") {
    const books = await getAllBooks(user.id);
    const book = (await getBookContents(books[5].id)) as BookType;
    return (
      <div className="flex h-screen w-full flex-col">
        <h1 className="text-4xl font-bold text-secondary-foreground">Test</h1>
        <p className="text-lg text-secondary-foreground">This is a test page.</p>
        <TestArea>
          <div className="flex justify-center gap-8">
            <GoToGroup currentBook={book} />
          </div>
        </TestArea>
      </div>
    );
  }
}

const TestArea = ({ children }: { children: React.ReactNode }) => {
  return <div className="m-4 rounded border border-dashed p-8">{children}</div>;
};
