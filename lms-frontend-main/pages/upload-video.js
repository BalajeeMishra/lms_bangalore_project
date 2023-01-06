import React from "react";
import FacLayout from "./faculty";

const uploadVideo = () => {
  return (
    <FacLayout>
      <div>
        <h5>Upload Video Here</h5>
      </div>
      <hr />

      <div className="container">
        <form onSubmit>
          <div class="row">
            <div class="col col-4 mb-3">
              <input class="form-control rounded-0" onChange={(e) => {}} type="file" name="filetoupload" id="filetoupload" />
            </div>

            <button type="submit" className="btn btn-primary">
              upload
            </button>
          </div>
        </form>
      </div>
    </FacLayout>
  );
};

export default uploadVideo;
