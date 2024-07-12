import { LatestPost } from "@/app/_components/post";
import { Col, Row } from "@/components/common/grid";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <Col>
          <Row>
            <LatestPost />
            <LatestPost />
            <LatestPost />
          </Row>
        </Col>
      </main>
    </HydrateClient>
  );
}
