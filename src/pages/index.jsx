import { Divider, Text } from "@chakra-ui/react";
import Navbar from "../components/Layout/Navbar";
export default function Index() {
  return (
    <>
      <section>
        <Text fontSize="3xl" fontWeight="semibold">
          Gowkeun
        </Text>
        <Text fontSize="sm" color="grey" marginTop={-1}>
          Rekapan leaderboard strava
        </Text>
        <Divider orientation="horizontal" marginY={5} />
        <p>
          This example adds a property <code>getLayout</code> to your page,
          allowing you to return a React component for the layout. This allows
          you to define the layout on a per-page basis. Since we're returning a
          function, we can have complex nested layouts if desired.
        </p>
        <p>
          When navigating between pages, we want to persist page state (input
          values, scroll position, etc.) for a Single-Page Application (SPA)
          experience.
        </p>
        <p>
          This layout pattern will allow for state persistence because the React
          component tree is persisted between page transitions. To preserve
          state, we need to prevent the React component tree from being
          discarded between page transitions.
        </p>
        <h3>Try It Out</h3>
        <p>
          To visualize this, try tying in the search input in the{" "}
          <code>Sidebar</code> and then changing routes. You'll notice the input
          state is persisted.
        </p>
      </section>
      <Navbar />
    </>
  );
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
