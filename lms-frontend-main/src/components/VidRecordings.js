import { useEffect, useState } from "react";
import FacultyService from "../../pages/api/faculty.service";
import CardView from "./CardView";

const VidRecordings = () => {
  const [records, setRecords] = useState([]);

  //   const videos = [
  //     "https://drive.google.com/file/d/1jZ2A2r7sR2IRPTdeeGRU2EJ-60OrrHWZ/view?usp=sharing",
  //     "https://drive.google.com/file/d/1CeU64lj9PhyETshbR7vFjYEOoIZ9MOHF/view?usp=sharing",
  //     "https://drive.google.com/file/d/1DW-v-Kpag4Rj-gVQYK75dgLdMp0orWBJ/view?usp=sharing"
  //   ];
  useEffect(() => {
    const chunk = 3;
    // splitIntoChunk(perRowUrls, chunk);
    FacultyService.listZoomRecords().then((res) => {
      if (res.status === 200) {
        splitIntoChunk(res.data.files_list, chunk);
      }
    });
  }, []);

  function splitIntoChunk(arr, chunk) {
    let allChunks = [];
    for (let i = 0; i < arr.length; i += chunk) {
      let chunkArray;
      chunkArray = arr.slice(i, i + chunk);
      allChunks.push(chunkArray);
    }
    setRecords(allChunks);
  }

  return (
    <div>
      <section className="contact-form-area wow fadeInUp delay-0-2s">
        <div className="container">
          <div className="bg-layout wow fadeInUp delay-0-2s">
            <div className="content">
              <div className="">
                {/* {videos.length > 0 &&
                  videos.map((uris, idx) => {
                    return (
                      <div key={"rec" + idx}>
                        <CardView uris={uris} />
                      </div>
                    );
                  })}
                {videos.length <= 0 && <div className="comming-soon-text">Coming soon</div>} */}
                {records.length > 0 &&
                  records.map((uris, idx) => {
                    return (
                      <div key={"rec" + idx}>
                        <CardView uris={uris} />
                      </div>
                    );
                  })}
                {records.length <= 0 && <div className="comming-soon-text">Coming soon</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VidRecordings;
