import { LatestPost } from "@/app/_components/post";
import { Col, Row } from "@/components/common/grid";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Col>
          <Row>
            <LatestPost />
            <LatestPost />
            <LatestPost />
            <LatestPost />
          </Row>
        </Col>
      </main>
    </HydrateClient>
  );
}
