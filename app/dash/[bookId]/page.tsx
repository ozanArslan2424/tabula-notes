import { getBookContents } from "@/actions/read";
import { GroupCardsGrid } from "@/components/layout/group-grid";

type Props = {
  params: {
    bookId: string;
  };
};

export default async function BookPage({ params: { bookId } }: Props) {
  const currentBook = await getBookContents(bookId);

  if (currentBook) {
    return <GroupCardsGrid currentBook={currentBook} />;
  }
}
