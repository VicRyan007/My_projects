import $ from 'jquery'

const loadHtmlSucessCallbacks = [] 

export function onLoadHtmlSucess(callback){
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback)
    }
}

// Lê todos os atributos wm-include
function loadIncludes(parent){
    if(!parent) parent= 'body'
    $(parent).find('[wm-include]').each(function(i,e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSucessCallbacks.forEach(callback => callback(data))

                loadIncludes(e)
            }
        })
    })
}

loadIncludes()