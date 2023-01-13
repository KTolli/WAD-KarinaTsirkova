<template>
  <div>
<h3> My Courses </h3>
    <div class="container">
      <table>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Semester</th>
            <th>Homeworks</th>
            <th>Exam</th>
            <th>Grade</th>
            <th>Note</th>

          </tr>
          <tr class="item" v-for="course in courses" :key="course.id">
            <td @click="showdescription(course.id)" class="code">{{ course.code }} </td>
            <td>{{ course.title}} </td>
            <td>{{ course.semester }} </td>
            <td>{{ course.homeworks }} </td> 
            <td class='red' v-if="course.exam < 21">{{ course.exam }}</td>
            <td class='blue' v-else>{{ course.exam }}</td>
            <td class='red' v-if="course.exam + course.homeworks < 51">{{ course.exam + course.homeworks }}</td>
            <td class='red' v-else-if="course.exam < 21">{{ course.exam + course.homeworks }}</td>
            <td class='blue' v-else>{{ course.exam + course.homeworks }}</td>
            <td><input name="note" type="note" id="note" ></td>
            <td><button class="update"  @click="updateCourses(course.note, course)">update</button> </td> 
          </tr>
    </table>
    </div>
    <div class="desc">
      <p>Here will be description</p>

    </div>
  </div>
</template>

<script>
export default {
  name: "MyCourses",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    fetchCourses() {
      fetch(`http://localhost:3000/api/mycourses/`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
   },
   updateCourses(id, course){
    fetch(`http://localhost:3000/api/mycourses/${id}`, {
      method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {"id": id, "code": course.code, "title": course.title, "semester": course.semester, "homeworks": course.homeworks, "exam": course.exam}),
            })
        .then((response) => {
          //console.log("response.data" + response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        
    });
      

   },
  },
  mounted() {
    this.fetchCourses();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
th {
  background: rgb(100, 151, 122);
}
td {
  background: rgb(186, 228, 204);
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
}

.desc{
  background: rgb(157, 160, 165); 
    padding: 10px 20px;
    display: block;
    width: 40%;
    margin: auto;
    font-size: 18px;
}

.red{
   background: rgb(225, 33, 19); 
}
.blue{
   background: rgb(19, 67, 163); 
}
</style>