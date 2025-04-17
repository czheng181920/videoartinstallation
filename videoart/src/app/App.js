'use client';
import React, { useState } from 'react';
import WebcamComponent from './WebcamComponent';

function App() {
  const [responses, setResponses] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [video, setVideo] = useState('');
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isSmiling, setIsSmiling] = useState(false);

  // Update responses state on change
  const handleChange = (q, value) => {
    setResponses((prev) => ({ ...prev, [q]: value }));
  };

  // Determine which video URL to show based on responses
  // const getVideoForResponses = (answers) => {
  //   // Example scoring algorithm:
  //   let score = 0;
  //   // Increase score if the answer is "A"
  //   Object.values(answers).forEach((answer) => {
  //     if (answer === 'A') score++;
  //   });

  //   // Map score to a video URL (you can refine this logic)
  //   if (score >= 3) {
  //     return 'https://www.youtube.com/embed/DB5TOsS5EyI'; // Good Wife's Guide Training Video
  //   } else {
  //     return 'https://www.youtube.com/embed/IKqXu-5jw60'; // Duck And Cover PSA
  //   }
  // };

  // Determine which video URL to show based on responses
  const getVideoForResponses = (answers) => {
    const strangerDangerVideos = [
      'https://www.youtube.com/embed/rxLD1uq94sE?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
      'https://www.youtube.com/embed/9mEQmrw6JpA?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
    ];
    const sexismVideos = [
      'https://www.youtube.com/embed/DB5TOsS5EyI?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
      'https://www.youtube.com/embed/swyqrf1PZjg?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
    ];
    const warVideos = [
      'https://www.youtube.com/embed/Lg9scNl9h4Q?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
    ];
    const earthVideos = [
      'https://www.youtube.com/embed/gZB7gSQRIuM?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
      'https://www.youtube.com/embed/HYkv7N7OLSU?controls=0&modestbranding=1&rel=0&iv_load_policy=3',
    ];

    const videoList = [
      strangerDangerVideos,
      sexismVideos,
      warVideos,
      earthVideos,
    ];

    const score = [0, 0, 0, 0];

    Object.values(answers).forEach((answer) => {
      if (answer === 'A') score[0]++;
      if (answer === 'B') score[1]++;
      if (answer === 'C') score[2]++;
      if (answer === 'D') score[3]++;
    });
    // Determine which video category to use based on the highest score

    let maxScoreIndex = 0;
    for (let i = 1; i < score.length; i++) {
      if (score[i] > score[maxScoreIndex]) {
        maxScoreIndex = i;
      }
    }

    console.log('Max Score Index:', maxScoreIndex);
    console.log(
      'Score:',
      videoList[maxScoreIndex][
        Math.floor(Math.random() * videoList[maxScoreIndex].length)
      ]
    );
    // return videoList[randomIndex];
    return videoList[maxScoreIndex][
      Math.floor(Math.random() * videoList[maxScoreIndex].length)
    ];
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    const selectedVideo = getVideoForResponses(responses);
    setVideo(selectedVideo);
    setSubmitted(true);
  };

  // Reset quiz to retake
  const handleRetake = () => {
    setResponses({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    setSubmitted(false);
    setVideo('');
    setStartedQuiz(false);
  };

  if (showLoading) {
    return (
      <>
        <WebcamComponent />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <img
            style={{
              width: '100px',
              height: '100px',
              marginBottom: '20px',
            }}
            src="https://i.gifer.com/ZKZg.gif"
            alt=""
          />
          <p>
            Saving profile data and loading your daily video... Please wait a
            moment.
          </p>
        </div>
      </>
    );
  }

  if (!startedQuiz) {
    return (
      <>
        <WebcamComponent />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1
            style={{
              fontSize: '5rem',
              textAlign: 'center',
              marginBottom: '20px',
              color: 'black',
            }}
          >
            Welcome to your Daily Morning Routine
          </h1>
          <p
            style={{
              fontSize: '3rem',
              textAlign: 'center',
              marginBottom: '20px',
              color: 'black',
            }}
          >
            This is an interactive way to start your morning routine. Answer the
            questions to receive your daily video. Click below to start the
            quiz.
          </p>
          <button
            style={{
              fontSize: '3rem',
              textAlign: 'center',
              marginBottom: '20px',
              color: 'black',
              border: '2px solid black',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={() => setStartedQuiz(true)}
          >
            Start Quiz
          </button>
        </div>
      </>
    );
  }
  if (submitted) {
    return (
      <>
        <WebcamComponent />
        <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen">
          <h1
            style={{
              fontSize: '5rem',
              textAlign: 'center',
              marginBottom: '20px',
              color: 'black',
            }}
          >
            Your Daily Video
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <iframe
              title="Daily Video"
              width="1320"
              height={315 * 2}
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <button
            style={{
              fontSize: '3rem',
              textAlign: 'center',
              marginBottom: '20px',
              color: 'black',
              border: '2px solid black',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={handleRetake}
          >
            Retake Quiz
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <WebcamComponent />
      <div className="App bg-gray-100">
        <div style={{ height: '15rem', width: '5rem' }}></div>

        <h1
          style={{
            fontSize: '5rem',
            textAlign: 'center',
            marginBottom: '20px',
            color: 'black',
          }}
        >
          Daily Morning Routine Survey
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Question 1 */}
          <section>
            <h2>Pick a Beverage That Mirrors Your Inner Flavor</h2>
            <div className="option-group">
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="A"
                  required
                  onChange={() => handleChange('q1', 'A')}
                />
                <img src="https://www.shutterstock.com/image-photo/espresso-coffee-transparent-cup-600nw-2512810803.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="B"
                  required
                  onChange={() => handleChange('q1', 'B')}
                />
                <img src="https://www.realsimple.com/thmb/45wu9o1lC00Ljsg2BmnwBPFZK64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-steep-tea-GettyImages-116418589-0aed81b547c0425787641b394fc18aa3.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="C"
                  required
                  onChange={() => handleChange('q1', 'C')}
                />
                <img src="https://www.thecookierookie.com/wp-content/uploads/2018/11/bourbon-chai-tea-latte-recipe-9-of-10.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="D"
                  required
                  onChange={() => handleChange('q1', 'D')}
                />
                <img src="https://www.cookingclassy.com/wp-content/uploads/2021/07/aqua-fresca-22.jpg" />
              </label>
            </div>
          </section>

          {/* Question 2 */}
          <section>
            <h2>Which fruit best represents your inner state today?</h2>
            <div className="option-group">
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="A"
                  required
                  onChange={() => handleChange('q2', 'A')}
                />
                <img src="https://images.adagio.com/images2/custom_blends/110446.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="B"
                  required
                  onChange={() => handleChange('q2', 'B')}
                />
                <img src="https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_ed4db77c-b1af-45fa-adbb-c24e92feaa3d.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="C"
                  required
                  onChange={() => handleChange('q2', 'C')}
                />
                <img src="https://media.istockphoto.com/id/1231559990/photo/orange-fruit-with-drop-shadow-on-white-background-commercial-image-of-citrus-fruits-in.jpg?s=612x612&w=0&k=20&c=zEnUx_53uqE-GBCLar_fK4PwJBG3U2pV0vSu0amRFDE=" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="D"
                  required
                  onChange={() => handleChange('q2', 'D')}
                />
                <img src="https://hips.hearstapps.com/hmg-prod/images/red-fresh-apple-isolated-on-white-background-royalty-free-image-1627314996.jpg" />
              </label>
            </div>
          </section>

          {/* Question 3 */}
          <section>
            <h2>Pick a Dessert That Resonates With Your Inner World</h2>
            <div className="option-group">
              <label>
                <input
                  type="radio"
                  name="q3"
                  value="A"
                  required
                  onChange={() => handleChange('q3', 'A')}
                />
                <img src="https://bakerbynature.com/wp-content/uploads/2018/01/EspresspChocolateTruffles3-1-of-1.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q3"
                  value="B"
                  required
                  onChange={() => handleChange('q3', 'B')}
                />
                <img src="https://www.kingarthurbaking.com/sites/default/files/recipe_legacy/4633-3-large.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q3"
                  value="C"
                  required
                  onChange={() => handleChange('q3', 'C')}
                />
                <img src="https://theviewfromgreatisland.com/wp-content/uploads/2015/10/hot-lava-cake-3220-October-12-2015.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q3"
                  value="D"
                  required
                  onChange={() => handleChange('q3', 'D')}
                />
                <img src="https://driscolls.imgix.net/-/media/assets/recipes/mixed-berry-tart.ashx" />
              </label>
            </div>
          </section>

          {/* Question 4 */}
          <section>
            <h2>Select a Landscape to Call Your Home</h2>
            <div className="option-group">
              <label>
                <input
                  type="radio"
                  name="q4"
                  value="A"
                  required
                  onChange={() => handleChange('q4', 'A')}
                />
                <img src="https://images.stockcake.com/public/9/d/1/9d1f1d8f-73dd-477d-8958-485d965fc963_large/neon-lit-alleyway-stockcake.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q4"
                  value="B"
                  required
                  onChange={() => handleChange('q4', 'B')}
                />
                <img src="https://media.istockphoto.com/id/465426133/photo/suburban-street-with-uniform-residential-housing.jpg?s=612x612&w=0&k=20&c=GADTHnlbZX0-jg1GmA3qlp6wHmYfhsbAFJpKQ_TtF_A=" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q4"
                  value="C"
                  required
                  onChange={() => handleChange('q4', 'C')}
                />
                <img src="https://external-preview.redd.it/EetWWVh5jsny8zdrzEKBpClRxtSZIr_7GSCqKLy2NuU.jpg?width=640&crop=smart&auto=webp&s=246958b8f6c99aae09578e5042e883a2c4d3e1ec" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q4"
                  value="D"
                  required
                  onChange={() => handleChange('q4', 'D')}
                />
                <img src="https://offbeatjapan.com/wp-content/uploads/2022/10/lush-verdant-forest-trail.jpg" />
              </label>
            </div>
          </section>

          {/* Question 5 */}
          <section>
            <h2>Choose a Symbol That Speaks to You</h2>
            <div className="option-group">
              <label>
                <input
                  type="radio"
                  name="q5"
                  value="A"
                  required
                  onChange={() => handleChange('q5', 'A')}
                />
                <img src="https://t4.ftcdn.net/jpg/05/06/10/85/360_F_506108544_9syICbYlAfhLAZKIbC9p0Osc7C9X0q0C.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q5"
                  value="B"
                  required
                  onChange={() => handleChange('q5', 'B')}
                />
                <img src="https://images.thdstatic.com/productImages/88c93171-9fad-463d-9bd4-447c97054404/svn/gold-stylewell-kids-kids-decor-h5-mh-973-64_600.jpg" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q5"
                  value="C"
                  required
                  onChange={() => handleChange('q5', 'C')}
                />
                <img src="https://i.ebayimg.com/images/g/dyoAAOSwhfBjyEMd/s-l400.png" />
              </label>
              <label>
                <input
                  type="radio"
                  name="q5"
                  value="D"
                  required
                  onChange={() => handleChange('q5', 'D')}
                />
                <img src="https://logowik.com/content/uploads/images/t_flying-abstract-duck-in-circle4354.logowik.com.webp" />
              </label>
            </div>
          </section>
          <button
            style={{
              fontSize: '3rem',
              textAlign: 'center',
              marginBottom: '20px',
              color: 'black',
              border: '2px solid black',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
