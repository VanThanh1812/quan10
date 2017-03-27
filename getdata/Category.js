/*
{
  "data": {
    "categories": [
      {
        "createAt": 1488177930,
        "description": "Thời sự",
        "href": "http://news.zing.vn/thoi-su.html",
        "id": 16,
        "isPublic": true,
        "name": "Thời sự",
        "updateAt": 1488184193
      },
      {
        "createAt": 1488178022,
        "description": "Kinh doanh",
        "href": "http://news.zing.vn/kinh-doanh.html",
        "id": 18,
        "isPublic": true,
        "name": "Kinh doanh",
        "updateAt": 1488185081
      },
      {
        "createAt": 1488178167,
        "description": "Đời sống",
        "href": "http://news.zing.vn/doi-song.html",
        "id": 21,
        "isPublic": true,
        "name": "Đời sống",
        "updateAt": 1488186506
      }
    ]
  }
  curl -X GET --header 'Accept: application/json' 'http://10.198.54.44:14212/api/v1/category/'

*/
export function getAllCategory() {
	fetch('http://10.198.54.44:14212/api/v1/category/',{
		method:'GET',
		headers:{
			'Accept':'application/json',
		}
	}).then((response)=>{
		return JSON.parse(response._bodyinit);
	}).catch((error)=>{
		console.error(error);
	});
}

export function getAddIDDemo(){
  fetch('http://newsreader2.me.zing.vn/mrm/ver2/article?method=get_update_article_list_by_category&uid=1&sid=901&cid=901102&count=100&includearticleinfo=false&articleinfocount=100&firstlid=0')
  .then((response)=>{
    console.log(typeof response);
  }).catch((error)=>{

  })
}