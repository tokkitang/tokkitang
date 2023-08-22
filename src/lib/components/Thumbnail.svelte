<script lang="ts">
    export let Title: string;
    export let ImageUrl: string;
</script>

<div class="thumbnail-container">
    // TODO: 제목 CSS 스타일링
    <p>
        {Title}
    </p>

    // FIXME: 이미지 크기 화면 크기에 따라 유동적으로 정해주기
    <img title={Title} class="image-box" width="500px" height="200px" src={ImageUrl} alt="text" />

</div>


<style>
    .thumbnail-container {
        align-items: center;
        text-align: center;
        margin: 10px ;
    }
</style>