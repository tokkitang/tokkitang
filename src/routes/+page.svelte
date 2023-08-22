<script>
	import Thumbnail from "$lib/components/Thumbnail.svelte";

    const introduction = "토끼탕은 맛있는 DB 모델링 도구입니다."

    // TODO: 인기있는 프로젝트 리스트 받아오기
    const popularProjectList = [
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
        {
            title: "제목",
            imageUrl: "https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp"            
        },
    ]
</script>

<div class="main-container">
    <div class="introduction">
        {introduction}
    </div>

    // FIXME: 이미지 크기 화면 크기에 따라 변동
    <img class="image-box" width="1000px" height="1000px" src="https://i.namu.wiki/i/fJ0LETm5yxZOYirLs_Yvopwj9a9sl5bQ8xRvrfb3CAt5v4B77H9AJdWaNgegE8jnYQkcQw9Uu5-kcJodo-kP2Q.webp" alt="text" />

    <div class="try-button-container">
        <button class="try-button">
            토끼탕 사용해보기
        </button>
    </div>



    // FIXME: CSS 스타일링 수정하기
    <div class="popular-erd-container">
        {#each [...popularProjectList] as value}
        <ul>
            <Thumbnail Title={value.title} ImageUrl={value.imageUrl} />
        </ul>
        {/each}
    </div>
</div>

<style>
    
    .introduction {
        text-align: center;
        font-size: large;
    }
    
    @media (min-width: 720px) {
        .introduction {
            font-size: x-large;
        }
    }
    
    .image-box {
        display: block;
        padding-top: 20px;
        margin: auto;
    }
    
    .main-container {
        background-color: #e0eee0;
        width: 100%;
        height: 100%;
    }

    .try-button-container {
        margin: auto;
        text-align: center;   
    }

    
    .try-button {
        background-color: rgb(213, 246, 191);  /* 색깔좀 정해주세요 */
        margin-top: 2%;
        border: grey solid 1px;
        border-radius: 5%;
        border-style: dotted;
        width: 125px;
        height: 50px;
    }

    .popular-erd-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
