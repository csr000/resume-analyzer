import swal from "sweetalert";

export function scrollToSection(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
}

export function showErr(text) {
  swal({
    title: "Error",
    text,
    icon: "error",
    button: "OK",
  });
}

export async function postData(
  url,
  queries,
  formData,
  {
    setName,
    setEmail,
    setLocation,
    setEducation,
    setSkills,
    setResumeData,
    setResume1,
    setResume2,
    setCompare,
  }
) {
  const query = new URLSearchParams();
  if (queries) {
    for (let index = 0; index < queries.length; index++) {
      query.append(queries[index].key, queries[index].value);
    }
  }
  swal({
    title: "Analyzing", 
    icon: "info",
    button: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
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

      swal({
        title: "Analyzing Complete",
        icon: "success",
        button: false,
        timer: 1000,
      });

      scrollToSection("output");
    } else {
      throw res.statusText;
    }
  } catch (err) {
    showErr(err);
  }
}
