<template>
    <div class="content">
        <h2>
            {{ $t('privacy.summary') }}
        </h2>
        <br>
        <h4>{{ $t('privacy.informationCollectedTitle') }}</h4>
        <p>
            <li>{{ $t('privacy.informationCollected[0]') }}</li>
            <li>{{ $t('privacy.informationCollected[1]') }}</li>
        </p>
        <h4>{{ $t('privacy.howWeUseInformationTitle') }}</h4>
        <p>
            <li>{{ $t('privacy.howWeUseInformation[0]') }}</li>
            <li>{{ $t('privacy.howWeUseInformation[1]') }}</li>
            <li>{{ $t('privacy.howWeUseInformation[2]') }}</li>
        </p>
        <h4>{{ $t('privacy.howWeUseInformationTitle') }}</h4>
        <p>
           {{ $t('privacy.sharingInformation')  }}
        </p>
        <p>
           {{ $t('privacy.security')  }}
        </p>
        <p>
           {{ $t('privacy.yourRights')  }}
        </p>
        <p>
           {{ $t('privacy.contact')  }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'policy'
}
</script>


<style scoped>
.content{
    text-align: center;
}

p, h4{
    text-align: start;
}

</style>
