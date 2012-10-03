class LocalizationController < ApplicationController

  def index
    if session[:user].nil? 
      redirect_to :controller=>'login', :action=> 'index'
      return
    end

    @languages = Language.all
    render "index"
  end

  def phraseKeys
    if session[:user].nil? 
      render :nothing => true
      return
    end

    render :json => PhraseKey.find(:all, :select => "id, name")
  end

  def phrases
    if session[:user].nil?
      render :nothing => true
      return
    end

    render :json => Phrase.find(:all, 
      :conditions => ["language_id = ?", params[:language_id]], 
      :select => "id, phrase_key_id, content")
  end

  def phraseDetails
    if session[:user].nil?
      render :nothing => true
      return
    end

  end

  def phraseKeyDetails

  end

  def savePhrase
    if session[:user].nil?
      render :nothing => true
      return
    end

  end

  def savePhraseKey
    if session[:user].nil?
      render :nothing => true
      return
    end
    
    if params[:keyId].nil?
      PhraseKey.create(:name => params[:name], :photo => nil)
    end

    render :nothing => true
  end

  def deletePhraseKey 

  end

  def imageForPhraseKey
    if session[:user].nil?
      render :nothing => true
      return
    end

    # http://railsforum.com/viewtopic.php?id=4642
  end

end

