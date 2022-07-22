var start_index = 0;
var end_index = 4;

function load_data(start, end) {
    // document.getElementById("container").innerHTML = "";
    fetch("./data.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            if (end >= jsondata.length) {
                document.getElementById("control").innerHTML = "";
            }
            create_objects(jsondata.slice(start, end));
        });
}

load_data(start_index, end_index);

function increment_number_of_items() {
    start_index = end_index;
    end_index += 4;
    console.log(start_index, end_index);
    load_data(start_index, end_index);
}

function create_objects(data) {
    let i = 0
    data.forEach(x => {
        let card = document.createElement('div')
        card.id = 'card' + i;
        card.className = 'card'
        // card.addEventListener('click', () => {
        //     click_item(x);
        // });
        //header
        let header = document.createElement('div')
        header.className = 'header'
        let picture_container = document.createElement('div')
        picture_container.className = 'pictureContainer'
        let name_date_container = document.createElement('div')
        name_date_container.className = 'nameDateContainer'
        let logo_container = document.createElement('div')
        logo_container.className = 'logoContainer'
        let profile_picture = document.createElement('img')
        profile_picture.className = 'profilePicture'
        let name = document.createElement('h3')
        name.className = 'name'
        let date = document.createElement('h6')
        date.className = 'date'
        let link_logo = document.createElement('a')
        link_logo.href = x.source_link
        let logo = document.createElement('img')
        logo.className = 'logo'
        let container = document.getElementById("container")
        profile_picture.src = x.image
        let logo_type = ''
        if (x.source_type === 'facebook') {
            logo_type = 'instagram-logo.svg'
        } else {
            logo_type = 'facebook.svg'
        }
        logo.src = logo_type
        link_logo.append(logo)
        name.innerHTML = x.name
        date.innerHTML = format_date(x.date.split(' ')[0])
        picture_container.append(profile_picture)
        header.append(picture_container)
        name_date_container.append(name)
        name_date_container.append(date)
        header.append(name_date_container)
        logo_container.append(link_logo)
        header.append(logo_container)
        card.append(header)
        //body
        let body = document.createElement('div')
        body.className = 'body'
        let mainPictureContainer = document.createElement('div')
        mainPictureContainer.className = 'mainPictureContainer'
        let mainPicture = document.createElement('img')
        mainPicture.className = 'mainPicture'
        mainPicture.src = x.image
        mainPictureContainer.append(mainPicture)
        let captionContainer = document.createElement('div')
        captionContainer.className = 'captionContainer'
        let caption = document.createElement('div')
        caption.className = 'caption'
        caption.innerHTML = x.caption
        captionContainer.append(caption)
        body.append(mainPictureContainer)
        body.append(captionContainer)
        card.append(body)
        //footer
        let footer = document.createElement('div')
        footer.className = 'footer'
        let likesContainer = document.createElement('div')

        likesContainer.className = 'likesContainer'
        let likesImage = document.createElement('img')
        likesImage.className = 'likesImage'
        likesImage.id = 'likes_img' + i;
        likesImage.src = 'heart.svg';
        likesContainer.append(likesImage)

        let likesNumber = document.createElement('p')
        likesNumber.className = 'likesNumber'
        likesNumber.id = 'likes_num' + i;
        likesNumber.innerHTML = x.likes

        likesContainer.append(likesNumber)

        footer.append(likesContainer)

        footer.addEventListener('click ', () => {
            console.log("Liked")
        });

        card.append(footer)
        body.addEventListener('click', () => {
            click_item(x);
        });
        container.append(card)
        i++;
    })
}

function format_date(date) {
    let date_arr = date.split('-')
    let year = date_arr[0]
    let month = date_arr[1]
    let formatted_month = ''
    let day = date_arr[2]
    switch (month) {
        case '01':
            formatted_month = 'Jan';
            break;
        case '02':
            formatted_month = 'Feb';
            break;
        case '03':
            formatted_month = 'Mar';
            break;
        case '04':
            formatted_month = 'Apr';
            break;
        case '05':
            formatted_month = 'May';
            break;
        case '06':
            formatted_month = 'Jun';
            break;
        case '07':
            formatted_month = 'Jul';
            break;
        case '08':
            formatted_month = 'Aug';
            break;
        case '09':
            formatted_month = 'Sep';
            break;
        case '10':
            formatted_month = 'Oct';
            break;
        case '11':
            formatted_month = 'Nov';
            break;
        case '12':
            formatted_month = 'Dec';
            break;
        default:
            formatted_month = '';
            break;
    }
    return day + ' ' + formatted_month + ' ' + year
}

function click_item(data) {
    console.log(data)
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];

    var bigImage = document.getElementById("modal_image");
    bigImage.setAttribute("src", data.image)

    var profileImage = document.getElementById("modal_profile_pic");
    profileImage.setAttribute("src", data.profile_image)

    var name = document.getElementById("modal_name");
    name.innerHTML = data.name

    var date = document.getElementById("modal_date");
    date.innerHTML = (format_date(data.date.split(" ")[0]))

    var logo = document.getElementById("modal_logo");
    if (data.source_type === "facebook") {
        logo.setAttribute("src", "facebook.svg")
    } else {
        logo.setAttribute("src", "instagram-logo.svg")
    }

    var caption = document.getElementById("modal_caption")
    caption.innerHTML = data.caption

    var like_img = document.getElementById("modal_like_img")
    like_img.setAttribute("src", "heart.svg")

    var likes_num = document.getElementById("modal_likes_number")
    likes_num.innerHTML = data.likes


    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function like_image(likes_num_id, card_data, likes_image_id) {
    console.log(likes_num_id)
    console.log(card_data)
    console.log(likes_image_id)
    var like_img = document.getElementById(likes_image_id)
    var likes_num = document.getElementById(likes_num_id)
    likes_num.innerHTML = card_data.likes + 1
    like_img.setAttribute("class", "liked")
}
