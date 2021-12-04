function Result({ lengthOfLights }) {
  if (!lengthOfLights) {
    return null;
  }
  return (
    <div>
      <h2>
        You will need lights about <span>{lengthOfLights} ft</span>{' '}
        long.
      </h2>
    </div>
  );
}

export default Result;
