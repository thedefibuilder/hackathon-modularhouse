import { Col, Row } from "@/components/common/grid";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  void api.token.getLatest.prefetch({});

  return (
    <HydrateClient>
      <main>
        <Col>
          <Row></Row>
        </Col>
      </main>
    </HydrateClient>
  );
}
