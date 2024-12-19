import Alert from "react-bootstrap/Alert";

function VotesAlert() {
  return (
    <section className="vote-alert">
      <Alert key="danger" variant="danger">
        your vote could not be processed at this time: please try again.
      </Alert>
    </section>
  );
}

export default VotesAlert;
