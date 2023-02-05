import Swal from "sweetalert2";
import { scrollToSection, showErr } from ".";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  // timer: 3000,
  timerProgressBar: true,
});

export default async function postData(
  url,
  queries,
  formData,
  { setName, setEmail, setLocation, setEducation, setSkills, setResumeData, setResume1, setResume2, setCompare }
) {
  const query = new URLSearchParams();
  if (queries) {
    for (let index = 0; index < queries.length; index++) {
      query.append(queries[index].key, queries[index].value);
    }
  }

  Toast.fire({
    title: "Analyzing, this usually takes less than a minute...",
    didOpen: (toast) => {
      Swal.showLoading();
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  try {
    const res = await fetch(url + query, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.status === 200) {
      console.log("Success:", data);

      setName && setName(data.name);
      setEmail && setEmail(data.email);
      setLocation && setLocation(data.location);
      setEducation && setEducation(data.education);
      setSkills && setSkills(data.skills);

      setResumeData && setResumeData(data);

      setResume1 && setResume1(data.resume1);
      setResume2 && setResume2(data.resume2);
      setCompare && setCompare(data.compare);

      Swal.close();
      Toast.fire({
        icon: "success",
        title: "Analyzing, Complete!",
        timer: 3000,
      });

      scrollToSection("output");
    } else {
      throw res.statusText;
    }
  } catch (err) {
    showErr(err);
  }
}


export const validateBeforePost = (fileName,jobDesc) => {
    let flag = 0
    if (fileName === "") {
      showErr("Please select resumes!");
      flag = 1
    } else if (jobDesc === "") {
      showErr("Please enter a job description!");
      flag = 1
    } 
    return !Boolean(flag)
  }