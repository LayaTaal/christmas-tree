import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Result from '../components/Result';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import backgroundImage from '../public/background.jpg';

export default function Home() {
  const [treeHeight, setTreeHeight] = useState();
  const [treeWidth, setTreeWidth] = useState();
  const [rowsOfLights, setRowsOfLights] = useState();
  const [topOffset, setTopOffset] = useState();
  const [lengthOfLights, setLengthOfLights] = useState(0);

  function Calculator(
    e,
    { treeHeight, treeWidth, rowsOfLights, topOffset },
  ) {
    e.preventDefault();

    // Calculate Tree Angle
    const angleRadians = Math.atan(treeWidth / (2 * treeHeight));
    const angleDegrees = (angleRadians * 180) / Math.PI;
    const distanceBetweenRows =
      (treeHeight - topOffset) / rowsOfLights;

    let row = 0;
    let currentLength = topOffset;
    let circumferences = [];
    let totalCircumference = 0;

    while (currentLength < treeHeight) {
      const rowDiameter = 2 * currentLength * Math.tan(angleRadians);
      totalCircumference += Number(rowDiameter) * Math.PI;
      circumferences.push({ row, circumference: totalCircumference });
      currentLength =
        Number(currentLength) + Number(distanceBetweenRows);
      row++;
    }

    setLengthOfLights(Math.round(totalCircumference));
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>
          How many lights do I need for my Christmas tree?
        </title>
        <meta
          name="description"
          content="Use this simple tool to figure out how many lights you need for your Christmas tree."
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1865138606278093"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <main className={styles.main}>
        <div className={styles.upper}>
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <h1 className={styles.title}>
                  How many lights do I need for my Christmas tree?
                </h1>
                <p className={styles.description}>
                  Every Christmas tree has to have some sort of lights
                  on it. Lights come in all kinds of varieties, from
                  solid colors to multi-color, blinking, and so on.
                  The list is exhaustive. When purchasing lights for
                  your tree, it can be difficult to know just what you
                  need, and especially what length you need!
                </p>
                <h2 className={styles.h2}>Fear Not!</h2>
                <p className={styles.description}>
                  This simple tool will help you get a good estimate
                  of the length of lights you should plan to get. All
                  you need is a tape measure and a few dimensions:
                </p>
                <ul>
                  <li>
                    The height of your tree from the bottom branch to
                    the top
                  </li>
                  <li>
                    The width of your tree from tip to tip of the
                    bottom branches
                  </li>
                  <li>An idea of how many rows of lights you want</li>
                </ul>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              className={styles.formContainer}
            >
              <Grid item xs={12} md={6} lg={4}>
                <h2 className={styles.h2}>Get Your Tree Height</h2>
                <p>
                  Once you have these numbers ready, input them in the
                  calculator below and get an estimate of exactly what
                  you need.
                </p>
                <form
                  className={styles.form}
                  onSubmit={(e) =>
                    Calculator(e, {
                      treeHeight,
                      treeWidth,
                      rowsOfLights,
                      topOffset,
                    })
                  }
                >
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Tree Height (ft.)"
                    helperText="How tall is your tree?"
                    margin="normal"
                    required
                    fullWidth
                    value={treeHeight}
                    onChange={(e) => setTreeHeight(e.target.value)}
                  />
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Tree Width (ft.)"
                    helperText="How wide is your tree at the lowest branch?"
                    margin="normal"
                    required
                    fullWidth
                    value={treeWidth}
                    onChange={(e) => setTreeWidth(e.target.value)}
                  />
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Rows of Lights"
                    helperText="How many rows of lights do you want?"
                    margin="normal"
                    required
                    fullWidth
                    value={rowsOfLights}
                    onChange={(e) => setRowsOfLights(e.target.value)}
                  />
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Top Offset (ft.)"
                    helperText="How far from the top of the tree do you want to start lights?"
                    margin="normal"
                    required
                    fullWidth
                    value={topOffset}
                    onChange={(e) => setTopOffset(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Submit
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                {lengthOfLights !== 0 && (
                  <Box className={styles.card}>
                    <Result lengthOfLights={lengthOfLights} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={styles.lower}>
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <h2 className={styles.h2}>How Does it Work?</h2>
                <p className={styles.description}>
                  This is all pretty simple really, just basic right
                  triangle geometry. The key is knowing the height of
                  the tree and the width at the base. Once we know
                  those two things, we can calculate the opening angle
                  of the tree. I then use that to build rows and
                  calculate the circumference at each row. This is
                  most certainly a rough approximation, but it should
                  be close enough for this purpose.
                </p>
                <h2 className={styles.h2}>Why did I do this?</h2>
                <p className={styles.description}>
                  Unfortunately, I went through the process of getting
                  a tree and lights, without thinking about just how
                  many I needed. Halfway through putting them on, I
                  realized I needed at least a third more to cover the
                  entire tree. I started to think about how to figure
                  this out in the future and decided to build a little
                  tool to help myself and hopefully someone else!
                </p>
                <h2 className={styles.h2}>Do I Plan Improvements?</h2>
                <p className={styles.description}>
                  Yes! I hope to make this a bit more robust in the
                  future - including being able to change units from
                  feet to something else, and selecting either a
                  number of rows or the space between rows.
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
